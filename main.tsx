/** @jsx h */
import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import { h, html } from "https://deno.land/x/htm@0.0.10/mod.tsx";
import { UnoCSS } from "https://deno.land/x/htm@0.0.10/plugins.ts";

// enable UnoCSS
html.use(UnoCSS())

const BOOK_ROUTE = new URLPattern({ pathname: "/books/:id" });

const handler = (req: Request) => {
   const match = BOOK_ROUTE.exec(req.url);

  if (match) {
    const id = match.pathname.groups.id;
    const page = (
      <div>
        <h1>Book {id}</h1>
        <p>{new Date().toLocaleString()}</p>
      </div>
    );
    const html = renderToString(page);
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
  return html({
    title: "Hello World!",
    body: (
      <div
        class="flex flex-col items-center justify-center w-full h-screen"
        style="background-image:url('https://dash.deno.com/assets/background-pattern.svg')"
      >
        <h1 class="text-4xl font-bold">Hello World!</h1>
        <h2 class="text-4xl font-bold">Example subtitle</h2>
        <p class="mt-2 text-lg text-center text-gray-600">Develop Locally, Deploy Globally</p>
        <footer class="fixed bottom-8 w-full h-6 flex items-center justify-center gap-2 text-gray-800">
          Powered by
          <a
            class="flex items-center gap-2 text-sm text-black no-underline font-semibold"
            href="https://deno.com/deploy"
          >
            <img alt="Deno" src="https://dash.deno.com/assets/logo.svg" class="w-5" /> Deno Deploy
          </a>
        </footer>
      </div>
    ),
  });
}

serve(handler);
