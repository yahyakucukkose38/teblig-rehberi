# Composes Play Store screenshots: background + device frame + real screen + caption.
Add-Type -AssemblyName System.Drawing
$dir = "C:\Users\WIN10\Desktop\TebligRehberi\Resimler\store-screenshots"
$meta = Get-Content (Join-Path $dir "captions.json") -Encoding UTF8 -Raw | ConvertFrom-Json
$captions = $meta.captions
$footer = $meta.footer

$emerald = [System.Drawing.Color]::FromArgb(205, 14, 77, 52)
$gold    = [System.Drawing.Color]::FromArgb(235, 200, 162, 78)
$ivory   = [System.Drawing.Color]::FromArgb(255, 245, 239, 224)
$bezel   = [System.Drawing.Color]::FromArgb(255, 14, 16, 18)

function New-RoundRect([single]$x,[single]$y,[single]$w,[single]$h,[single]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

for ($i = 1; $i -le 4; $i++) {
  $bg = Get-ChildItem $dir -File | Where-Object { $_.Name -like "arkaplan-$i*" } | Select-Object -First 1
  $sc = Get-ChildItem $dir -File | Where-Object { $_.Name -like "ekran-$i*" } | Select-Object -First 1
  if (-not $bg -or -not $sc) { Write-Output "eksik: $i"; continue }

  $W = 1080; $H = 1920
  $bmp = New-Object System.Drawing.Bitmap($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

  # --- background (cover) ---
  $bImg = [System.Drawing.Image]::FromFile($bg.FullName)
  $scale = [Math]::Max($W / $bImg.Width, $H / $bImg.Height)
  $nw = $bImg.Width * $scale; $nh = $bImg.Height * $scale
  $g.DrawImage($bImg, ($W - $nw) / 2, ($H - $nh) / 2, $nw, $nh)
  $bImg.Dispose()

  # --- device with real screenshot ---
  $sImg = [System.Drawing.Image]::FromFile($sc.FullName)
  $Hs = 1340.0; $Ws = [Math]::Round($Hs * $sImg.Width / $sImg.Height)
  $bez = 16; $dW = $Ws + 2 * $bez; $dH = $Hs + 2 * $bez
  $dx = [int](($W - $dW) / 2); $dy = 400

  for ($s = 0; $s -lt 3; $s++) {
    $shCol = [System.Drawing.Color]::FromArgb((42 - $s * 12), 0, 0, 0)
    $shBrush = New-Object System.Drawing.SolidBrush($shCol)
    $off = 10 + $s * 7
    $shPath = New-RoundRect ($dx - $off / 2) ($dy + $off) $dW $dH 52
    $g.FillPath($shBrush, $shPath); $shBrush.Dispose(); $shPath.Dispose()
  }
  $bodyPath = New-RoundRect $dx $dy $dW $dH 52
  $bodyBrush = New-Object System.Drawing.SolidBrush($bezel)
  $g.FillPath($bodyBrush, $bodyPath); $bodyBrush.Dispose()

  $screenPath = New-RoundRect ($dx + $bez) ($dy + $bez) $Ws $Hs 40
  $g.SetClip($screenPath)
  $g.DrawImage($sImg, ($dx + $bez), ($dy + $bez), [single]$Ws, [single]$Hs)
  $g.ResetClip(); $screenPath.Dispose(); $sImg.Dispose()

  $pen = New-Object System.Drawing.Pen($gold, 2.5)
  $g.DrawPath($pen, $bodyPath); $pen.Dispose(); $bodyPath.Dispose()

  # --- headline panel + wrapped text ---
  $cap = $captions[$i - 1]
  $fontSize = 56
  $maxTextW = 900
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $font = New-Object System.Drawing.Font("Segoe UI", $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $measured = $g.MeasureString($cap, $font, [int]$maxTextW, $sf)
  $lineH = $g.MeasureString("Ag", $font).Height
  while (($measured.Height -gt ($lineH * 2.4)) -and ($fontSize -gt 40)) {
    $fontSize -= 4; $font.Dispose()
    $font = New-Object System.Drawing.Font("Segoe UI", $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $measured = $g.MeasureString($cap, $font, [int]$maxTextW, $sf)
    $lineH = $g.MeasureString("Ag", $font).Height
  }
  $padX = 46; $padY = 28
  $tw = [Math]::Min($maxTextW, $measured.Width)
  $panelW = $tw + 2 * $padX + 30; $panelH = $measured.Height + 2 * $padY
  $panelX = ($W - $panelW) / 2; $panelY = 150
  $panelPath = New-RoundRect $panelX $panelY $panelW $panelH 28
  $panelBrush = New-Object System.Drawing.SolidBrush($emerald)
  $g.FillPath($panelBrush, $panelPath); $panelBrush.Dispose()
  $panelPen = New-Object System.Drawing.Pen($gold, 2)
  $g.DrawPath($panelPen, $panelPath); $panelPen.Dispose(); $panelPath.Dispose()

  $tRect = New-Object System.Drawing.RectangleF(($panelX + $padX), ($panelY + $padY), ($panelW - 2 * $padX), ($panelH - 2 * $padY))
  $sf2 = New-Object System.Drawing.StringFormat
  $sf2.Alignment = [System.Drawing.StringAlignment]::Center
  $sf2.LineAlignment = [System.Drawing.StringAlignment]::Center
  $sf2.FormatFlags = [System.Drawing.StringFormatFlags]::NoClip
  $ivoryBrush = New-Object System.Drawing.SolidBrush($ivory)
  $g.DrawString($cap, $font, $ivoryBrush, $tRect, $sf2)
  $ivoryBrush.Dispose(); $font.Dispose()

  # --- footer brand ---
  $ffont = New-Object System.Drawing.Font("Segoe UI", 34, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $fsf = New-Object System.Drawing.StringFormat
  $fsf.Alignment = [System.Drawing.StringAlignment]::Center
  $fShadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(160, 0, 0, 0))
  $g.DrawString($footer, $ffont, $fShadow, (New-Object System.Drawing.RectangleF(2, 1842, $W, 60)), $fsf); $fShadow.Dispose()
  $goldBrush = New-Object System.Drawing.SolidBrush($gold)
  $g.DrawString($footer, $ffont, $goldBrush, (New-Object System.Drawing.RectangleF(0, 1840, $W, 60)), $fsf)
  $goldBrush.Dispose(); $ffont.Dispose()

  $g.Dispose()
  $out = Join-Path $dir "final-$i.png"
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  $kb = [math]::Round((Get-Item $out).Length / 1KB)
  Write-Output "olusturuldu: final-$i.png ($kb KB)"
}
