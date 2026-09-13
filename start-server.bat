@echo off
title Ravemark Local Web Server
echo Starting Ravemark local web server...
powershell -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
