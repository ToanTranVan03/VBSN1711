import webbrowser
import threading
import time
from datetime import datetime
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Thông tin nhân vật chính
BIRTHDAY_DATA = {
    "name": "Trần Văn Toàn",
    "nickname": "Toàn Kun / Anh Toàn Siêu Cấp Vip Pro",
    "dob": "17/11/2003",
    "today": "17/11/2026",
    "age": 23,
    "milestone": "Tuổi 23 Rực Rỡ - Đỉnh Cao Thanh Xuân",
    "wishes": [
        {"author": "Hội Anh Em Thân Thiết", "text": "Chúc Trần Văn Toàn tuổi 23 luôn tràn đầy nhiệt huyết, sự nghiệp rực rỡ, tiền tài đầy túi và sớm dẫn người yêu xinh đẹp ra mắt anh em nhé! 🎂🍻"},
        {"author": "Gia Đình & Bạn Bè", "text": "Mừng sinh nhật 23 tuổi của Toàn! Chúc bạn luôn giữ nụ cười tỏa nắng, sức khỏe dồi dào, vạn sự hanh thông và chinh phục mọi đỉnh cao cuộc sống!"},
        {"author": "Thần May Mắn", "text": "Hôm nay 17/11/2026, vũ trụ gửi tới Trần Văn Toàn ngập tràn may mắn, niềm vui bất tận và tài lộc rủng rỉnh suốt 365 ngày tới!"},
        {"author": "Team Coder & AI", "text": "Happy 23rd Birthday Toàn! Code không bug, lương nghìn đô, vạn dặm thành công, mãi đỉnh mãi chiến!"}
    ]
}

@app.route('/')
def index():
    return render_template('index.html', data=BIRTHDAY_DATA)

@app.route('/api/wishes', methods=['GET', 'POST'])
def manage_wishes():
    if request.method == 'POST':
        req_data = request.get_json()
        if req_data and 'text' in req_data:
            new_wish = {
                "author": req_data.get('author', 'Một người bạn bí ẩn'),
                "text": req_data.get('text', '')
            }
            BIRTHDAY_DATA['wishes'].insert(0, new_wish)
            return jsonify({"status": "success", "wish": new_wish})
    return jsonify(BIRTHDAY_DATA['wishes'])

def open_browser():
    time.sleep(1.2)
    webbrowser.open('http://127.0.0.1:5000')

if __name__ == '__main__':
    print("=" * 65)
    print("🎉 ĐANG KHỞI ĐỘNG BỮA TIỆC SINH NHẬT SIÊU TO CHO TRẦN VĂN TOÀN 🎉")
    print("🎂 Ngày sinh: 17/11/2003 | Ngày tổ chức: 17/11/2026 (Tròn 23 tuổi)")
    print("🌐 Truy cập: http://127.0.0.1:5000")
    print("=" * 65)
    
    # Tự động mở trình duyệt
    threading.Thread(target=open_browser, daemon=True).start()
    
    # Khởi chạy server
    app.run(host='0.0.0.0', port=5000, debug=False)
