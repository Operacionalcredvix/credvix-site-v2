# Execute este script a partir da raiz de credvix-site-v2 APOS extrair o patch.
# Ele remove apenas a antiga pagina /canal-de-integridade/relatar.
if (-not (Test-Path -LiteralPath './src/app/App.tsx')) {
  Write-Error 'Execute este script na raiz da pasta credvix-site-v2.'
  exit 1
}

$arquivos = @(
  './src/pages/RelatarIntegridadePage.tsx',
  './src/pages/RelatarIntegridadePage.module.css'
)

foreach ($arquivo in $arquivos) {
  if (Test-Path -LiteralPath $arquivo) {
    Remove-Item -LiteralPath $arquivo -Force
    Write-Host "Removido: $arquivo"
  }
}
Write-Host 'Limpeza concluida. Nenhuma outra pagina foi alterada.'
