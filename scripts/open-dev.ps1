# Sunucu ayakta olduktan sonra varsayilan tarayicida acar.
# Kullanim: .\scripts\open-dev.ps1
# npm run dev:simple ise: .\scripts\open-dev.ps1 -Path /
# Port farkliysa: .\scripts\open-dev.ps1 -Port 3001
param([int]$Port = 3000, [string]$Path = '/tr')
$u = "http://127.0.0.1:$Port$Path"
Start-Process $u
