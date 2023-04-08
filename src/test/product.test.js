import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import makeid from "../utils/random.js";
import { it } from "mocha";
import jwt from "jsonwebtoken";
chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const goodProduct = {
    name: "product" + makeid(10),
    description: "New Samsung A23 released in 2022",
    image: ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fages.unsplash.png", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.png", "https://www.google.com/imgres?imgurl=https%3A%2F%2ages.unsplash.png", "https://www.google.com/imgres?imgurl=https%3A%2FFimages.unsplash.png"],
    condition: "New",
    price: 900,
    categoryId: 4,
    expiryDate: "2023-04-06 10:30:00-07:00",
};
const badProduct = {
    name: "product" + makeid(10),
    description: "New Samsung A23 released in 2022",
    image: ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fages.unsplash.png", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.png", "https://www.google.com/imgres?imgurl=https%3A%2F%2ages.unsplash.png", "https://www.google.com/imgres?imgurl=https%3A%2FFimages.unsplash.png"],
    condition: "New",
    price: 900,
    expiryDate: "2023-04-06 10:30:00-07:00",
};

// add product test
describe("Add  product", () => {
    describe("User active", () => {
        const sellerCookie =
            "Authorized=" +
            jwt.sign({ id: 16 }, "atlpcohort28teamprojecttechsmith");

        describe("All information provided", () => {
            it("Should add a product and return code 200", (done) => {
                chai
                    .request(app)
                    .post("/api/product/addProduct")
                    .send(goodProduct)
                    .set("cookie", sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        done();
                    });
            });
        });
        describe("Information not provided", () => {
            it("Should return code 400", (done) => {
                chai
                    .request(app)
                    .post("/api/product/addProduct")
                    .send(badProduct)
                    .set("cookie", sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    });
            });
        });

        describe("Adding existing product", () => {
            it("Should return code 403", (done) => {
                chai
                    .request(app)
                    .post("/api/product/addProduct")
                    .send(goodProduct)
                    .set("cookie", sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(403);
                        done();
                    });
            });
        });
    });
    describe("User inactive", () => {
        const sellerInactiveCookie =
            "Authorized=" +
            jwt.sign({ id: 17 }, "atlpcohort28teamprojecttechsmith");
        it("Should return code 401", (done) => {
            chai
                .request(app)
                .post("/api/product/addProduct")
                .send(goodProduct)
                .set("cookie", sellerInactiveCookie)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });
    });
});