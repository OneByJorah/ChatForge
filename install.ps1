#Requires -Version 5.1
<#
.SYNOPSIS
    Windows dev installer for ChatForge.
#>
$ErrorActionPreference = "Stop"
cd $PSScriptRoot

Write-Host "=== Installing ChatForge local dev environment ===" -ForegroundColor Cyan

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is required. Install from https://nodejs.org/"
}

if (-not (Test-Path node_modules)) {
    npm install
}

Write-Host "Starting dev server on port 8787..." -ForegroundColor Green
npm run dev
