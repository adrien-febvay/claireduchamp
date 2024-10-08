<xsl:stylesheet
  version="1.0"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap file</title>
        <link rel="stylesheet" type="text/css" href="/sitemap.css" />
      </head>
      <body>
        <header role="banner">
          <h1>Sitemap file</h1>
        </header>
        <main>
          <table>
            <thead>
              <th>URL location</th>
              <th>Last modification date</th>
              <th>Change frequency</th>
              <th>Priority</th>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <tr>
                  <td>
                    <a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a>
                    <xsl:for-each select="xhtml:link">
                      <div>
                        <xsl:value-of select="@hrefLang"/>:
                        <a href="{@href}"><xsl:value-of select="@href"/></a>
                      </div>
                    </xsl:for-each>
                  </td>
                  <td><xsl:value-of select="sm:lastmod"/></td>
                  <td><xsl:value-of select="sm:changefreq"/></td>
                  <td><xsl:value-of select="sm:priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
        <footer role="contentinfo">
          Generated using Express / React.
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>