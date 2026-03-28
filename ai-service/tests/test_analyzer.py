import torch
from src.services.analyzer import Analyzer

class DummyModel:
    def __call__(self, x):
        # Return deterministic embedding of shape [1, 3]
        return torch.tensor([[0.8, 0.1, 0.1]], dtype=torch.float32)

def build_frame():
    return {"keypoints": [0.1] * 34}

def test_analyzer_returns_expected_keys(monkeypatch):
    from src.core.config import settings
    monkeypatch.setattr(settings, "SEQUENCE_LENGTH", 4)

    sequence = [build_frame(), build_frame()]
    pro_embeddings = torch.tensor([[1.0, 0.0, 0.0], [0.9, 0.1, 0.0]], dtype=torch.float32)
    result = Analyzer.analyze(DummyModel(), pro_embeddings, sequence)

    assert "overall_score" in result
    assert "performance_level" in result
    assert "distance_to_expert" in result
    assert "max_similarity" in result
    assert "avg_similarity" in result