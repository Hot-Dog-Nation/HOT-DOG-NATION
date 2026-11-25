@echo off
title Hot Dog Nation Restaurant Server
echo ========================================================
echo Starting Hot Dog Nation Local Web Server...
echo Every Bite Feels Enough - Law Gate, Phagwara
echo ========================================================
powershell -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
