import http.server
import socketserver

PORT = 8090

class CrossOriginHeadersHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        super().end_headers()

# 允许绑定并重用端口
socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("", PORT), CrossOriginHeadersHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Security Headers Enabled (COOP/COEP)")
    httpd.serve_forever()