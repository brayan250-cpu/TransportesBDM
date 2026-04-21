@echo off
cd /d "%~dp0nginx"
nginx.exe -s stop
echo Servidor detenido.
pause
