@echo off
title Git Push Rapide

echo =========================
echo   Git Push Automatique
echo =========================
echo.

set /p message=Quelles modifications as-tu faites ? : 

if "%message%"=="" (
    echo Tu dois entrer un message.
    pause
    exit
)

echo.
echo Ajout des fichiers...
git add .

echo.
echo Commit...
git commit -m "%message%"

echo.
echo Push...
git push

echo.
echo Termine !
pause