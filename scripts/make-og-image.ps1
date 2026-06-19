# Generates public/og-image.png (1200x630) for AI Flux social sharing
# Uses System.Drawing (Segoe UI has full Hungarian glyph coverage)
Add-Type -AssemblyName System.Drawing

$W = 1200
$H = 630
$root = Split-Path -Parent $PSScriptRoot
$logoPath = Join-Path $root "public\logo_F.png"
$outPath  = Join-Path $root "public\og-image.png"

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# --- Background: subtle vertical dark gradient (#000000 -> #060614) ---
$bgRect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$c1 = [System.Drawing.Color]::FromArgb(255, 0, 0, 0)
$c2 = [System.Drawing.Color]::FromArgb(255, 7, 7, 22)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($bgRect, $c1, $c2, 90.0)
$g.FillRectangle($bgBrush, $bgRect)

# --- Cyan glow accent (top-right) ---
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath.AddEllipse(640, -280, 900, 700)
$glow = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$glow.CenterColor = [System.Drawing.Color]::FromArgb(60, 0, 229, 255)
$glow.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 102, 255))
$g.FillPath($glow, $glowPath)

# --- Blue glow accent (bottom-left) ---
$glow2Path = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow2Path.AddEllipse(-300, 300, 800, 650)
$glow2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow2Path)
$glow2.CenterColor = [System.Drawing.Color]::FromArgb(45, 0, 102, 255)
$glow2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 0, 0))
$g.FillPath($glow2, $glow2Path)

# --- Logo mark (left) ---
$logo = [System.Drawing.Image]::FromFile($logoPath)
$logoH = 300.0
$logoW = $logoH * ($logo.Width / $logo.Height)
$logoX = 90
$logoY = ($H - $logoH) / 2
$g.DrawImage($logo, [int]$logoX, [int]$logoY, [int]$logoW, [int]$logoH)

# --- Text block (right) ---
$textX = [int]($logoX + $logoW + 60)

# "AI Flux" — gradient cyan -> blue
$titleFont = New-Object System.Drawing.Font("Segoe UI", 88, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$titleRect = New-Object System.Drawing.Rectangle($textX, 195, 620, 130)
$titleBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($titleRect, [System.Drawing.Color]::FromArgb(255, 0, 229, 255), [System.Drawing.Color]::FromArgb(255, 0, 122, 255), 0.0)
$g.DrawString("AI Flux", $titleFont, $titleBrush, [single]$textX, 195.0)

# Tagline
$tagFont = New-Object System.Drawing.Font("Segoe UI", 34, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 200, 210, 225))
# Build with explicit code points so file encoding can't mangle the accents
$tag = "AI-nat" + [char]0x00ED + "v fejleszt" + [char]0x0151 + " " + [char]0x00FC + "gyn" + [char]0x00F6 + "ks" + [char]0x00E9 + "g"
$g.DrawString($tag, $tagFont, $tagBrush, [single]($textX + 4), 320.0)

# Small URL line in cyan
$urlFont = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$urlBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 229, 255))
$g.DrawString("aiflux.hu", $urlFont, $urlBrush, [single]($textX + 4), 400.0)

# --- Save ---
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$logo.Dispose()
Write-Output "Saved: $outPath"
