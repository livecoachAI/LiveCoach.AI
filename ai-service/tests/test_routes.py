from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_health():
    r = client.get("/")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "healthy"

def test_invalid_api_key_on_analyze():
    # minimal fake file upload
    files = {"video": ("x.mp4", b"fake", "video/mp4")}
    r = client.post(
        "/analyze/badminton/smash",
        files=files,
        headers={"x-api-key": "wrong-key"},
    )
    assert r.status_code == 401