import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import makeid from '../utils/random.js';
import { it } from 'mocha';


chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const goodProduct = {

    name: 'product' + makeid(10),
    image: [
        "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1168940/pexels-photo-1168940.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    price: 85000,
    categoryId: 70,
    condition: "New",
    description: "New Samsung A10 released in 2021",
    expiryDate: "2023-05-06T17:30:00.000Z"
}
const adminProduct = {

        name: 'product' + makeid(10),
        price: 85000,
        categoryId: 70,
        condition: "New",
        image: ["https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1168940/pexels-photo-1168940.jpeg?auto=compress&cs=tinysrgb&w=80"],
        description: "New Samsung A10 released in 2021",
        expiryDate: "2023-05-06T17:30:00.000Z",
        sellerId: 6
    }
    //BAD PRODUCT
const badProduct = {
    name: 'product' + makeid(10),
    image: [
        "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg",
        "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg",
        "https://www.pngwing.com/en/free-png-zbfan",
        "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg"
    ],
    price: 85000,
    condition: "New",
    description: "New Samsung A10 released in 2021",
    expiryDate: "2023-05-06T17:30:00.000Z"
}

// INITIALIZING AUTHORIZATION COOKIE
let sellerCookie = '',
    twoFAToken = '';
let adminCookie = '';

// SELLER LOGIN
const sellerLogin = {
    email: 'atlpseller@gmail.com',
    password: 'Password@00',
};

//ADMIN LOG IN
const adminLogin = {
    email: 'joshua@gmail.com',
    password: 'Testing@123'
};



//SELLER COLLECTION
const sellerCollection = [
    { id: 81 }, { id: 82 }, { id: 83 }, { id: 84 }, { id: 85 },
    { id: 86 }, { id: 92 }, { id: 87 }, { id: 88 }, { id: 89 },
    { id: 90 }, { id: 91 }, { id: 93 }, { id: 94 }, { id: 95 },
]

const productoUpdate = {
    name: 'productcqhwcvig',
    image: [
        "https://userconent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg",
        "https://userconent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg",
        "https://www.pnging.com/en/free-png-zbfan",
        "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg"
    ],
    categoryId: 50,
    price: 5000,
    description: 'The fastest on baterry',
    sellerId: 36
}

// SELLER LOGIN REQUEST
describe('Seller Login', () => {
    it('Login and return seller token for two factor authentication', (done) => {
        chai
            .request(app)
            .post('/api/users/login')
            .send(sellerLogin)
            .end((err, res) => {
                twoFAToken = res.body.token;
                expect(res).to.have.status(202);
                done();
            });
    });
});

// SELLER CONFIRM TWO FACTOR AUTHENTICATION
describe('Seller 2FA', () => {
    it('Confirm 2FA and return seller cookie', (done) => {
        chai
            .request(app)
            .get(`/api/users/login/${twoFAToken}`)
            .end((err, res) => {
                sellerCookie = res.header['set-cookie'];
                expect(res).to.have.status(200);
                done();
            });
    });
});
describe('Admin Login', () => {
    it('Login succesfully', (done) => {
        chai
            .request(app)
            .post('/api/users/login')
            .send(adminLogin)
            .end((err, res) => {
                adminCookie = res.header['set-cookie'][0];
                expect(res).to.have.status(200);
                done();
            });
    });
});

// add product test by seller
describe('Add  product', () => {
    describe('User active', () => {
        describe('All information provided', () => {
            it('Should add a product and return code 201', (done) => {
                chai
                    .request(app)
                    .post('/api/products')
                    .send(goodProduct)
                    .set('cookie', sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        done();
                    });
            });
        });
        describe('Information not provided', () => {
            it('Should return code 400', (done) => {
                chai
                    .request(app)
                    .post('/api/products')
                    .send(badProduct)
                    .set('cookie', sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    });
            });
        });
        describe('Adding existing product', () => {
            it('Should return code 409', (done) => {
                chai
                    .request(app)
                    .post('/api/products')
                    .send(goodProduct)
                    .set('cookie', sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(409);
                        done();
                    });
            });
        });


    });

    describe('Check Expiration of products', () => {
        it('Should return Code 200 and valid response data', (done) => {
            chai
                .request(app)
                .get('/api/products/expired')
                // .set('cookie', cookie)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('Available products', () => {
        describe('Products in stock', () => {
            it('Should get  products and return code 200', (done) => {
                chai
                    .request(app)
                    .get('/api/products/inStock')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });
        describe('A seller can get specific product', () => {
            it('A seller can get specific product ', (done) => {
                chai
                    .request(app)
                    .get('/api/products/225')
                    .set('cookie', sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });
        describe('A seller  get specific product not in stock', () => {
            it('A seller can get specific product not in stock ', (done) => {
                chai
                    .request(app)
                    .get('/api/products/-1')
                    .set('cookie', sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });
        describe('Delete a specific  product', () => {
            describe('Delete a product not in your collection', () => {
                it('Should return code 404', (done) => {
                    chai
                        .request(app)
                        .delete('/api/products/5')
                        .set('cookie', sellerCookie)
                        .end((err, res) => {
                            expect(res).to.have.status(404);
                            done();
                        });
                });
            });
        });
        describe('Update a specific  product', () => {
            describe('update a product', () => {
                it('Should return code 200', (done) => {
                    chai
                        .request(app)
                        .put('/api/products/29')
                        .send(productoUpdate)
                        .set('cookie', sellerCookie)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            done();
                        });
                });
            });
            describe('Update a product not in your collection', () => {
                it('Should return code 404', (done) => {
                    chai
                        .request(app)
                        .put('/api/products/-1')
                        .set('cookie', sellerCookie)
                        .end((err, res) => {
                            expect(res).to.have.status(404);
                            done();
                        });
                });
            });
        });

        // User CAN GET ALL ORDERS
        describe('Buyer, Seller or Admin users', () => {
            it('can display all Product ', (done) => {
                chai
                    .request(app)
                    .post('/api/products/search')
                    .send({
                        name: null,
                        price: null,
                        categoryIds: null,
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('Buyer, Seller or Admin users', () => {
            it('can search Products which have substring in name of "product" ', (done) => {
                chai
                    .request(app)
                    .post('/api/products/search')
                    .send({
                        name: 'product',
                        price: null,
                        categoryIds: null,
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('Buyer, Seller or Admin users', () => {
            it('can search Products which have price of 85000 ', (done) => {
                chai
                    .request(app)
                    .post('/api/products/search')
                    .send({
                        name: null,
                        price: 85000,
                        categoryIds: null,
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('Buyer, Seller or Admin users', () => {
            it('can search Products which have category Id of 70 ', (done) => {
                chai
                    .request(app)
                    .post('/api/products/search')
                    .send({
                        name: null,
                        price: null,
                        categoryIds: 70,
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('Buyer, Seller or Admin users', () => {
            it('can search Products which have substring in name of "product" or have price of 85000 or have  category Id of 70 ', (done) => {
                chai
                    .request(app)
                    .post('/api/products/search')
                    .send({
                        name: 'product',
                        price: 85000,
                        categoryIds: 70,
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('Buyer, Seller or Admin users', () => {
            it('can search Products and get an error when name parameter doesn\'t match any product', (done) => {
                chai
                    .request(app)
                    .post('/api/products/search')
                    .send({
                        name: 'productsdfdsfsfsdca32343242342',
                        price: null,
                        categoryIds: null,
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });

        describe('Buyer, Seller or Admin users', () => {
            it('can search Products and get an error when price parameter doesn\'t match any product', (done) => {
                chai
                    .request(app)
                    .post('/api/products/search')
                    .send({
                        name: null,
                        price: 8500032424,
                        categoryIds: null,
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });

        describe('Buyer, Seller or Admin users', () => {
            it('can search Products and get an error when categoryIds parameter doesn\'t match any product ', (done) => {
                chai
                    .request(app)
                    .post('/api/products/search')
                    .send({
                        name: null,
                        price: null,
                        categoryIds: 7023424,
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });

        describe('Buyer, Seller or Admin users', () => {
            it('can search Products and get an error when name, price or categoryIds parameters doesn\'t match any product', (done) => {
                chai
                    .request(app)
                    .post('/api/products/search')
                    .send({
                        name: 'product2343242',
                        price: 85000324234,
                        categoryIds: 70545,
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });
    });
});


//CRUD PRODUCT BY ADMIN
describe('CRUD product by admin', () => {
    // GET ALL PRODUCTS
    describe('Admin should be able to get all products', () => {
        it('Admin should be able to get all products', (done) => {
            chai
                .request(app)
                .get('/api/admin/products')
                .set('cookie', adminCookie)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    //GET A SPECIFIC PRODUCT 
    describe('Admin should be able to get specific', () => {
        it('Admin should be able to get specific ', (done) => {
            chai
                .request(app)
                .get('/api/admin/products/225')
                .set('cookie', adminCookie)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
    describe('Admin  get specific product not in stock', () => {
        it('Admin  get specific product not in stock ', (done) => {
            chai
                .request(app)
                .get('/api/admin/products/1010101010')
                .set('cookie', adminCookie)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
    // CREATE NEW PRODUCT
    describe('Given a user is an admin', () => {
        it('Should create a new product', (done) => {
            chai
                .request(app)
                .post('/api/admin/products')
                .send(adminProduct)
                .set('cookie', adminCookie)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });
    describe('Adding existing product', () => {
        it('Should return code 409', (done) => {
            chai
                .request(app)
                .post('/api/admin/products')
                .send(goodProduct)
                .set('cookie', adminCookie)
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    done();
                });
        });
    });
    describe('Information not provided', () => {
        it('Should return code 400', (done) => {
            chai
                .request(app)
                .post('/api/admin/products')
                .send(badProduct)
                .set('cookie', adminCookie)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    // UPDATE A PRODUCT
    describe('Given a user is an admin', () => {
        it('Should update a product', (done) => {
            chai
                .request(app)
                .put('/api/admin/products/262')
                .send(adminProduct)
                .set('cookie', adminCookie)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    // DELETE NON-EXISTING PRODUCT
    describe('Given a user is an admin and is trying to delete a non-existing product', () => {
        it('Should not delete a product and return error 404', (done) => {
            chai
                .request(app)
                .delete('/api/admin/product/-1')
                .set('cookie', adminCookie)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});
describe('Available products', () => {
    describe('Products in stock', () => {
        it('Should get  products and return code 200', (done) => {
            chai
                .request(app)
                .get('/api/products/inStock')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

});


describe('Delete a specific  product', () => {
    describe('Delete a product not in your collection', () => {
        it('Should return code 404', (done) => {
            chai
                .request(app)
                .delete('/api/products/5')
                .set('cookie', sellerCookie)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});







describe('get product from your collection', () => {
    it('should returnn status code of 200', (done) => {
        chai.request(app)
            .get('/api/products/mySingleProduct/4')
            .set('Cookie', sellerCookie)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });

    })
});


//PRODUCT NOT FOUND
describe('Product not found', () => {
    it('should returnn status code of 404 if the product is not available', (done) => {
        chai.request(app)
            .get('/api/products/mySingleProduct/21')
            .set('Cookie', sellerCookie)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });

    })
});


describe('Update a specific  product', () => {
    describe('update a product', () => {
        it('Should return code 200', (done) => {
            chai
                .request(app)
                .put('/api/products/29')
                .send(productoUpdate)
                .set('cookie', sellerCookie)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});

describe('Update a product not in your collection', () => {
    it('Should return code 404', (done) => {
        chai
            .request(app)
            .put('/api/products/-1')
            .set('cookie', sellerCookie)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});


// User CAN GET ALL OORDERS
describe('Buyer, Seller or Admin users', () => {
    it('can display all Product ', (done) => {
        chai
            .request(app)
            .post('/api/products/search')
            .send({
                name: null,
                price: null,
                categoryIds: null,
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Buyer, Seller or Admin users', () => {
    it('can search Products which have substring in name of "product" ', (done) => {
        chai
            .request(app)
            .post('/api/products/search')
            .send({
                name: 'product',
                price: null,
                categoryIds: null,
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Buyer, Seller or Admin users', () => {
    it('can search Products which have price of 85000 ', (done) => {
        chai
            .request(app)
            .post('/api/products/search')
            .send({
                name: null,
                price: 85000,
                categoryIds: null,
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Buyer, Seller or Admin users', () => {
    it('can search Products which have category Id of 70 ', (done) => {
        chai
            .request(app)
            .post('/api/products/search')
            .send({
                name: null,
                price: null,
                categoryIds: 70,
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Buyer, Seller or Admin users', () => {
    it('can search Products which have substring in name of "product" or have price of 85000 or have  category Id of 70 ', (done) => {
        chai
            .request(app)
            .post('/api/products/search')
            .send({
                name: 'product',
                price: 85000,
                categoryIds: 70,
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Buyer, Seller or Admin users', () => {
    it('can search Products and get an error when name parameter doesn\'t match any product', (done) => {
        chai
            .request(app)
            .post('/api/products/search')
            .send({
                name: 'productsdfdsfsfsdca32343242342',
                price: null,
                categoryIds: null,
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});

describe('Buyer, Seller or Admin users', () => {
    it('can search Products and get an error when price parameter doesn\'t match any product', (done) => {
        chai
            .request(app)
            .post('/api/products/search')
            .send({
                name: null,
                price: 8500032424,
                categoryIds: null,
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});

describe('Buyer, Seller or Admin users', () => {
    it('can search Products and get an error when categoryIds parameter doesn\'t match any product ', (done) => {
        chai
            .request(app)
            .post('/api/products/search')
            .send({
                name: null,
                price: null,
                categoryIds: 7023424,
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});

describe('Buyer, Seller or Admin users', () => {
    it('can search Products and get an error when name, price or categoryIds parameters doesn\'t match any product', (done) => {
        chai
            .request(app)
            .post('/api/products/search')
            .send({
                name: 'product2343242',
                price: 85000324234,
                categoryIds: 70545,
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});