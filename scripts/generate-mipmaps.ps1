# Play Store 아이콘으로 Android mipmap 생성
Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path $PSScriptRoot -Parent
$srcPath = Join-Path $projectRoot "store-assets\play-store-icon.png"
$resRoot = Join-Path $projectRoot "android\app\src\main\res"

function Save-ResizedIcon {
    param(
        [System.Drawing.Image]$Source,
        [string]$OutPath,
        [int]$Size,
        [double]$Scale = 1.0
    )
    $dir = Split-Path $OutPath -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::FromArgb(255, 238, 246, 255))
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    $drawSize = [int]($Size * $Scale)
    $offset = [int](($Size - $drawSize) / 2)
    $g.DrawImage($Source, $offset, $offset, $drawSize, $drawSize)
    $g.Dispose()
    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

$src = [System.Drawing.Image]::FromFile($srcPath)

$launcherSizes = @{
    "mipmap-mdpi"    = 48
    "mipmap-hdpi"    = 72
    "mipmap-xhdpi"   = 96
    "mipmap-xxhdpi"  = 144
    "mipmap-xxxhdpi" = 192
}

$foregroundSizes = @{
    "mipmap-mdpi"    = 108
    "mipmap-hdpi"    = 162
    "mipmap-xhdpi"   = 216
    "mipmap-xxhdpi"  = 324
    "mipmap-xxxhdpi" = 432
}

foreach ($folder in $launcherSizes.Keys) {
    $size = $launcherSizes[$folder]
    $base = Join-Path $resRoot $folder
    Save-ResizedIcon -Source $src -OutPath (Join-Path $base "ic_launcher.png") -Size $size -Scale 0.92
    Save-ResizedIcon -Source $src -OutPath (Join-Path $base "ic_launcher_round.png") -Size $size -Scale 0.92
}

foreach ($folder in $foregroundSizes.Keys) {
    $size = $foregroundSizes[$folder]
    $base = Join-Path $resRoot $folder
    Save-ResizedIcon -Source $src -OutPath (Join-Path $base "ic_launcher_foreground.png") -Size $size -Scale 0.78
}

$src.Dispose()
Write-Host "Mipmap icons generated."
