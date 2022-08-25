const CORS = "https://cors.deno.dev/";
const targetSite = "https://github.com/";

self.addEventListener("fetch", (e) => {
    const request = e.request;
    console.log("RAW: ", request);
    let modifiedRequest;
    if (request.url.startsWith(location.origin)) {
        // for absolute
        const url = request.url.replace(location.origin + "/", CORS + targetSite);
        modifiedRequest = new Request(url, { ...request, url });
    } else {
        // for relative
        const url = CORS + request.url;
        modifiedRequest = new Request(url, { ...request, url });
    }
    if (modifiedRequest.url === CORS) modifiedRequest = request;
    console.log("MOD: ", modifiedRequest);
    e.respondWith(
        (async () => {
            const res = await fetch(modifiedRequest);
            const blob = await res.blob();
            const resp = new Response(blob, {
                ...res,
                headers: {
                    "content-type": res.headers.get("content-type"),
                },
            });
            return resp;
        })()
    );
});
