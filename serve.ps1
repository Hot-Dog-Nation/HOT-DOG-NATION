param(
    [int]$Port = 8080
)

$baseDir = $PSScriptRoot
if (-not $baseDir) {
    $baseDir = (Get-Location).Path
}

# Auto-detect local network Wi-Fi / Ethernet IPv4
$localIP = "192.168.0.102"
try {
    $adapters = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | Where-Object { 
        $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" 
    }
    if ($adapters) {
        $localIP = ($adapters | Select-Object -First 1).IPAddress
    }
} catch {}

if (-not $localIP) {
    $localIP = "192.168.0.102"
}

$endpoint = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Any, $Port)
$listener = New-Object System.Net.Sockets.TcpListener($endpoint)

try {
    $listener.Start()
} catch {
    Write-Warning "Port $Port is busy. Trying port 8000..."
    $Port = 8000
    $endpoint = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Any, $Port)
    $listener = New-Object System.Net.Sockets.TcpListener($endpoint)
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  RAVEMARK LOCAL NETWORK WEB SERVER                       " -ForegroundColor Black -BackgroundColor Green
Write-Host "                                                          "
Write-Host "  Local URL:   http://localhost:$Port/                     " -ForegroundColor Cyan
Write-Host "  Network URL: http://$($localIP):$Port/                " -ForegroundColor Yellow
Write-Host "                                                          "
Write-Host "  Connect any phone/laptop on the same Wi-Fi using:       " -ForegroundColor White
Write-Host "  >>> http://$($localIP):$Port/                           " -ForegroundColor Green
Write-Host "                                                          "
Write-Host "  Serving files from: $baseDir                            " -ForegroundColor Gray
Write-Host "  Press Ctrl+C to stop the server                         " -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Green

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($true) {
        $tcpClient = $listener.AcceptTcpClient()
        try {
            $stream = $tcpClient.GetStream()
            $stream.ReadTimeout = 3000
            $stream.WriteTimeout = 3000

            $buffer = New-Object byte[] 4096
            $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
            if ($bytesRead -le 0) {
                continue
            }

            $raw = [System.Text.Encoding]::ASCII.GetString($buffer, 0, $bytesRead)
            $firstLine = ($raw -split "`r?`n")[0]
            $tokens = $firstLine -split '\s+'
            if ($tokens.Count -lt 2) {
                continue
            }

            $method = $tokens[0].ToUpper()
            $url = $tokens[1].Split('?')[0]
            $decoded = [System.Uri]::UnescapeDataString($url).TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($decoded)) {
                $decoded = "index.html"
            }

            $rel = $decoded -replace '/', [System.IO.Path]::DirectorySeparatorChar
            $target = [System.IO.Path]::GetFullPath((Join-Path $baseDir $rel))

            if (-not $target.StartsWith($baseDir, [System.StringComparison]::OrdinalIgnoreCase)) {
                $forbidden = [System.Text.Encoding]::ASCII.GetBytes("HTTP/1.1 403 Forbidden`r`nContent-Length: 0`r`nConnection: close`r`n`r`n")
                $stream.Write($forbidden, 0, $forbidden.Length)
                continue
            }

            if (Test-Path $target -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($target).ToLower()
                $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $fileBytes = [System.IO.File]::ReadAllBytes($target)

                $headers = "HTTP/1.1 200 OK`r`n" +
                           "Content-Type: $contentType`r`n" +
                           "Content-Length: $($fileBytes.Length)`r`n" +
                           "Access-Control-Allow-Origin: *`r`n" +
                           "Connection: close`r`n`r`n"
                $headBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
                $stream.Write($headBytes, 0, $headBytes.Length)

                if ($method -ne "HEAD") {
                    $stream.Write($fileBytes, 0, $fileBytes.Length)
                }
                $stream.Flush()
                Write-Host "[200 OK] $decoded ($contentType)" -ForegroundColor Green
            } else {
                $body = [System.Text.Encoding]::UTF8.GetBytes("<html><body style='font-family:sans-serif;background:#060608;color:#fff;padding:50px;text-align:center;'><h2>404 - Not Found</h2><p>$decoded</p></body></html>")
                $headers = "HTTP/1.1 404 Not Found`r`n" +
                           "Content-Type: text/html; charset=utf-8`r`n" +
                           "Content-Length: $($body.Length)`r`n" +
                           "Connection: close`r`n`r`n"
                $headBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
                $stream.Write($headBytes, 0, $headBytes.Length)
                if ($method -ne "HEAD") {
                    $stream.Write($body, 0, $body.Length)
                }
                $stream.Flush()
                Write-Host "[404 Not Found] $decoded" -ForegroundColor Red
            }
        } catch {
            # Ignore client disconnect
        } finally {
            try { $tcpClient.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
}
