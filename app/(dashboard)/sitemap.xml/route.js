export async function GET() {
    const baseUrl = "https://www.mysticalfragrance.com";
    
    const links = [
      `${baseUrl}/`,
      `${baseUrl}/products`,
      `${baseUrl}/about`,
      `${baseUrl}/blogs`,
      `${baseUrl}/login`,
      `${baseUrl}/addCart`,
      `${baseUrl}/policy`,
      `${baseUrl}/contact`,
    ];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${links
        .map((url) => `<url><loc>${url}</loc></url>`)
        .join("\n")}
    </urlset>`
  
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
  