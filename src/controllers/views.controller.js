import { CartsService, ProductsService, UsersService } from '../repositories/index.js';

export default class ViewsController {
    productsService;
    cartsService;
    usersService;
    constructor() {
        this.productsService = ProductsService;
        this.cartsService = CartsService;
        this.usersService = UsersService;
    }
    loginViewController = async (req, res) => {
        res.render("login");
    }
    registerViewController = async (req, res) => {
        res.render("register");
    }
    recoverViewController = async ( req, res) => {
        res.render("recover");
    }
    homeViewController = async (req, res) => {
        //query para buscar productos por categoria: frutas, lacteos o panificados
        const { limit = 10, page = 1, category = "all", sort = undefined  } = req.query;
        const user = req.user;
        const userFound = await this.usersService.getUserCartId(user.user.user);
        const cartIdFound = String(userFound.carts);
        const cartIdMatch = cartIdFound.match(/[0-9a-f]{24}/i);
        const cartId = cartIdMatch[0];
        try {
            const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await this.productsService.getallProducts(limit, page, category, sort);
            res.render("home", { products : docs, hasPrevPage, hasNextPage, nextPage, prevPage, page, limit, category, sort, user,cartId });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    getProductsCartViewController = async (req, res) => {
        try {
            const { cid } = req.params;
            const cartProducts = await this.cartsService.getProductsCart(cid);
            if (cartProducts === "Cart does not exist") {
                return res.json({
                    message: "Cart does not exist",
                    data: cartProducts
                })
            }
            res.render("cart", { cartProducts, cid });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}