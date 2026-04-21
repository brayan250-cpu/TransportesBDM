@echo off
title React Portable (Nginx)

REM Ir al directorio donde está Nginx
cd /d "%~dp0nginx"

REM Iniciar servidor
start "" "http://localhost:8080"
nginx.exe

echo Nginx iniciado en http://localhost:8080
echo Cierra esta ventana o ejecuta stop.bat para detenerlo.
pause
