import os

pia_dir = os.path.join('components', 'dashboard', 'pia')
app_pia_dir = os.path.join('app', 'dashboard', 'pia')
os.makedirs(pia_dir, exist_ok=True)
os.makedirs(app_pia_dir, exist_ok=True)
