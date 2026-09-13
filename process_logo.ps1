Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::new('assets/images/ravemark-logo.jpg')
$w = $bmp.Width
$h = $bmp.Height

$whiteOut = [System.Drawing.Bitmap]::new($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$darkOut = [System.Drawing.Bitmap]::new($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        $r = $pixel.R
        $g = $pixel.G
        $b = $pixel.B

        $brightness = [Math]::Max($r, [Math]::Max($g, $b))
        if ($brightness -lt 30) {
            continue
        }

        # Lime green detection: Green channel significantly higher than blue and red
        $isLime = ($g -gt 90 -and $g -gt ($b + 40) -and $g -ge ($r * 0.75))

        if ($isLime) {
            $whiteOut.SetPixel($x, $y, $pixel)
            $darkOut.SetPixel($x, $y, $pixel)
        } else {
            # White / metallic
            $whiteOut.SetPixel($x, $y, $pixel)
            
            # For dark mode on light theme, make text dark charcoal #111111 with alpha proportional to brightness
            $alpha = [int][Math]::Min(255, ($brightness * 1.6))
            $darkColor = [System.Drawing.Color]::FromArgb($alpha, 17, 17, 17)
            $darkOut.SetPixel($x, $y, $darkColor)
        }
    }
}

# Crop the logos so they don't have unnecessary black borders
# Find bounding box
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        if ($darkOut.GetPixel($x, $y).A -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$cropW = ($maxX - $minX) + 1
$cropH = ($maxY - $minY) + 1
$rect = [System.Drawing.Rectangle]::new($minX, $minY, $cropW, $cropH)

$croppedWhite = $whiteOut.Clone($rect, $whiteOut.PixelFormat)
$croppedDark = $darkOut.Clone($rect, $darkOut.PixelFormat)

$croppedWhite.Save('assets/images/ravemark-logo-white.png', [System.Drawing.Imaging.ImageFormat]::Png)
$croppedDark.Save('assets/images/ravemark-logo-dark.png', [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$whiteOut.Dispose()
$darkOut.Dispose()
$croppedWhite.Dispose()
$croppedDark.Dispose()

Write-Host "Logos processed and saved: white ($cropW x $cropH) and dark ($cropW x $cropH)"
