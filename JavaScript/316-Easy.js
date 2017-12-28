function Item(name, price, discount) {
  this.name = name;
  this.price = price;
  this.discount = discount;
};

function Cart() {
  this.cart = [];

  this.addItem = (item) => { this.cart.push(item); return this.cart; };
  this.count = (item) => this.getItems(item).length;
  this.getItems = (item) => this.cart.filter(v => v.name === item);

  this.removeItem = (item) => {
    const index = this.cart.indexOf(item);
    if(index > -1) {
      return this.cart.splice(index, 1);
    }
  };

  this.gross = () => {
    return this.cart.reduce((p, c) => p += c.price, 0);
  }

  this.discounts = () => {
    const discounts = this.cart.filter((item, index, self) => self.indexOf(item) === index).map(item => item.discount);
    return discounts.reduce((total, discount) => total + discount(this), 0);
  }

  this.total = () => this.gross() - this.discounts();
}

function Catalog() {
  const OH = new Item('OH', 300.00, (cart) => Math.floor(cart.count('OH') / 3) * OH.price);
  const BC = new Item('BC', 110.00, (cart) => {
    const bcNum = cart.count('BC');
    return (bcNum > 4) ? bcNum * 20.00 : 0.00; 
  });
  const SK = new Item('SK', 30.00, (cart) => cart.count('OH') * SK.price);

  this.catalog = [OH, BC, SK];

  this.toCatalogItem = (orders) => orders.map(order => this.catalog.filter(item => item.name === order)[0]);
  this.addItem = (item) => this.catalog.push(item);
  this.getItem = (item) => this.catalog.find(i => i.name === item);
  this.removeItem = (item) => {
    const index = this.catalog.indexOf(item);
    if (index > -1) {
      return this.catalog.splice(index);
    }
  };
}

function main() {
  let cart = new Cart();
  const catalog = new Catalog();

  const args = process.argv.slice(2);
  const orders = catalog.toCatalogItem(args).filter(order => order !== undefined);
  orders.forEach(order => cart.addItem(order));
  const orderNames = orders.map(order => order.name).join(', ');
  const header = 'Items' + ' '.repeat(orderNames.length - 2) + 'Total';
  console.log(header);
  console.log(`${orderNames} = ${cart.total()}`);
}

main();

