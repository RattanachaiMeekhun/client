import "./Card.scss";

interface props {}

const ProductCardComponet = () => {
  return (
    <div className="card">
      <img
        className="header"
        src="https://paksod-api.wolfapprove.com/dev/tmp/images/plant/1660755087325IMG_20220817_235127.jpg"
        alt="ผัก"
      />
      <div className="body">
        <div className="product-name">กรีนโอ๊คออแกนิค</div>
        <div className="product-price">300฿/กก</div>
      </div>
    </div>
  );
};

export default ProductCardComponet;
