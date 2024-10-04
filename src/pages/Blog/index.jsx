
const Blog = () => {
    return (
        <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
              <span className="font-semibold text-xl text-primary mb-2 block">
                Blog của Chúng Tôi
              </span>
              <h2 className="font-bold text-4xl sm:text-5xl md:text-[48px] text-dark mb-4">
                Tin Tức Gần Đây Của Chúng Tôi
              </h2>
              <p className="text-base text-body-color">
                Có nhiều biến thể của các đoạn văn của Lorem Ipsum có sẵn nhưng phần lớn đã bị thay đổi theo một hình thức nào đó.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4">
            <div className="max-w-[370px] mx-auto mb-10">
              <div className="rounded overflow-hidden mb-8">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/blogs/blog-01/image-01.jpg"
                  alt="image"
                  className="w-full"
                />
              </div>
              <div>
                <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
                  22 Tháng 12, 2023
                </span>
                <h3>
                  <a
                    href="javascript:void(0)"
                    className="font-semibold text-2xl sm:text-3xl lg:text-2xl xl:text-3xl mb-4 inline-block text-dark hover:text-primary"
                  >
                    Gặp AutoManage, công cụ quản lý AI tốt nhất
                  </a>
                </h3>
                <p className="text-base text-body-color">
                  Lorem Ipsum chỉ là văn bản giả mạo của ngành in ấn và dàn trang.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4">
            <div className="max-w-[370px] mx-auto mb-10">
              <div className="rounded overflow-hidden mb-8">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/blogs/blog-01/image-02.jpg"
                  alt="image"
                  className="w-full"
                />
              </div>
              <div>
                <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
                  15 Tháng 3, 2023
                </span>
                <h3>
                  <a
                    href="javascript:void(0)"
                    className="font-semibold text-2xl sm:text-3xl lg:text-2xl xl:text-3xl mb-4 inline-block text-dark hover:text-primary"
                  >
                    Cách kiếm nhiều tiền hơn với tư cách là một huấn luyện viên sức khỏe
                  </a>
                </h3>
                <p className="text-base text-body-color">
                  Lorem Ipsum chỉ là văn bản giả mạo của ngành in ấn và dàn trang.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4">
            <div className="max-w-[370px] mx-auto mb-10">
              <div className="rounded overflow-hidden mb-8">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/blogs/blog-01/image-03.jpg"
                  alt="image"
                  className="w-full"
                />
              </div>
              <div>
                <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
                  05 Tháng 1, 2023
                </span>
                <h3>
                  <a
                    href="javascript:void(0)"
                    className="font-semibold text-2xl sm:text-3xl lg:text-2xl xl:text-3xl mb-4 inline-block text-dark hover:text-primary"
                  >
                    Hướng dẫn đơn giản để bán thêm và bán chéo
                  </a>
                </h3>
                <p className="text-base text-body-color">
                  Lorem Ipsum chỉ là văn bản giả mạo của ngành in ấn và dàn trang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Blog