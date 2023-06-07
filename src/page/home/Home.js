const Home = () => {
  return (
    <>
      <div className="home">
        <h3>Giới thiệu demo ReactJS:</h3>
        <div className="text-home">
          <p>
            1. Sử dụng API từ website
            <a href="https://reqres.in/">https://reqres.in/</a>
          </p>
          <p>
            2. Sử dụng React để tạo 1 màn hình website cơ bản bao gồm các chức
            năng:
          </p>
          <ul>
            <li>2.1. Đăng nhập/Đăng xuất</li>
            <li>2.2. Hiển thị list User</li>
            <li>2.3. Thêm - Sửa - Xóa - Tìm kiếm User</li>
            <li>2.4. Import - Export file CSV</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
