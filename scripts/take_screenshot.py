import subprocess, time, sys, os

# Start http server
server = subprocess.Popen(
    [sys.executable, '-m', 'http.server', '8093', '--directory', 
     os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public')],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)
time.sleep(2)

try:
    result = subprocess.run([
        'npx', 'playwright', 'screenshot',
        '--browser=chromium', '--full-page',
        'http://127.0.0.1:8093/',
        sys.argv[1]
    ], capture_output=True, text=True, timeout=20)
    print(result.stdout)
    print(result.stderr)
    print(f"Screenshot saved to {sys.argv[1]}")
except Exception as e:
    print(f"Error: {e}")
finally:
    server.terminate()
    server.wait()
