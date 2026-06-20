# Generates a LinkedIn banner (1584x396) for Zoltán's personal profile — AI Flux brand
Add-Type -AssemblyName System.Drawing

$W = 1584
$H = 396
$logoPath = "C:\Projects\aiflux-website\public\logo_F.png"
$outPath  = "$env:USERPROFILE\Desktop\aiflux-linkedin-banner.png"

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Background gradient (#050510 -> #0d1635)
$bgRect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$c1 = [System.Drawing.Color]::FromArgb(255, 5, 5, 16)
$c2 = [System.Drawing.Color]::FromArgb(255, 13, 22, 53)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($bgRect, $c1, $c2, 135.0)
$g.FillRectangle($bgBrush, $bgRect)

# Cyan glow (right)
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath.AddEllipse(950, -250, 900, 700)
$glow = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$glow.CenterColor = [System.Drawing.Color]::FromArgb(55, 0, 229, 255)
$glow.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 102, 255))
$g.FillPath($glow, $glowPath)

# Top accent bar
$barBrushRect = New-Object System.Drawing.Rectangle(0, 0, $W, 8)
$barBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($barBrushRect, [System.Drawing.Color]::FromArgb(255,0,229,255), [System.Drawing.Color]::FromArgb(255,0,102,255), 0.0)
$g.FillRectangle($barBrush, $barBrushRect)

# Logo mark (right side, away from bottom-left profile photo)
$logo = [System.Drawing.Image]::FromFile($logoPath)
$logoH = 210.0
$logoW = $logoH * ($logo.Width / $logo.Height)
$g.DrawImage($logo, [int](1300), [int](($H - $logoH)/2), [int]$logoW, [int]$logoH)

# Text block — left/center (x=360 keeps clear of bottom-left profile photo)
$tx = 360

# Kicker
$kickFont = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$kickBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 229, 255))
$g.DrawString("AI FLUX", $kickFont, $kickBrush, [single]$tx, 96.0)

# Main lines (gradient white-ish). Accents via code points.
$mainFont = New-Object System.Drawing.Font("Segoe UI", 48, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$mainBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 248, 255))
$line1 = "AI-folyamatok, chatbotok"
$line2 = "& weboldalak - c" + [char]0x00E9 + "geknek"
$g.DrawString($line1, $mainFont, $mainBrush, [single]$tx, 132.0)
$g.DrawString($line2, $mainFont, $mainBrush, [single]$tx, 196.0)

# Sub line
$subFont = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 150, 180, 220))
$sub = "aiflux.hu   " + [char]0x00B7 + "   youtube.com/@aibot_hu"
$g.DrawString($sub, $subFont, $subBrush, [single]$tx, 274.0)

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $logo.Dispose()
Write-Output "Saved: $outPath"
