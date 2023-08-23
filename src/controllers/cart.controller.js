import { CartsService } from "../repositories/index.js";


export default class CartsController {
    cartsService;
    constructor() {
        this.cartsService = CartsService;
    }
    getProductsCartController = async (req, res) => {
        try {
            const { cid } = req.params;
            const cartProducts = await this.cartsService.getProductsCart(cid);
            if (cartProducts === "Cart does not exist") {
                return res.json({
                    message: "Cart does not exist",
                    data: cartProducts,
                })
            }
            return res.json({
                message: "Cart retrieved successfully",
                data: cartProducts,
            })
            //res.render("cart", { cartProducts, cid });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    // addCartController = async (req, res) => {
    //     try {
    //         const cart = req.body;
    //         const newCart = await this.cartsService.addCart(cart);
    //         return res.json({
    //             message: "Cart added successfully",
    //             data: newCart
    //         })
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // }
    addProductCartController = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await this.cartsService.addProductCart(cid, pid);
            if (cart === "Cart not found") {
                return res.json({
                    message: "Cart not found",
                    data: cart
                })
            }
            if (cart === "Product not found") {
                return res.json({
                    message: "Product not found",
                    data: cart
                })
            }
            return res.json({
                message: "Product added successfully",
                data: cart
            })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    deleteProductCartController = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await this.cartsService.deleteProductCart(cid, pid);
            if (cart === "Cart not found") {
                return res.json({
                    message: "Cart not found",
                    data: cart
                })
            }
            if (cart === "Product not found") {
                return res.json({
                    message: "Product not found",
                    data: cart
                })
            }
            return res.json({
                message: "Product deleted successfully",
                data: cart
            })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    deleteProductsCartController = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.cartsService.deleteProductsCart(cid);
            if (cart === "Cart not found") {
                return res.json({
                    message: "Cart not found",
                    data: cart
                })
            }
            return res.json({
                message: "Cart products deleted successfully",
                data: cart
            })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    updateProductCartController = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await this.cartsService.updateProductCart(cid, pid, quantity);
            if (cart === "Cart not found") {
                return res.json({
                    message: "Cart not found",
                    data: cart
                })
            }
            if (cart === "Product not found") {
                return res.json({
                    message: "Product not found",
                    data: cart
                })
            }
            return res.json({
                message: "Product quantity updated successfully",
                data: cart
            })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    updateProductsCartController = async (req, res) => {
        try {
            const { cid } = req.params;
            const products = req.body;
            const cart = await this.cartsService.updateProductsCart(cid, products);
            if (cart === "Cart not found") {
                return res.json({
                    message: "Cart not found",
                    data: cart
                })
            }
            if (cart === "Product not found") {
                return res.json({
                    message: "Some of the products are not found",
                    data: cart
                })
            }
            return res.json({
                message: "Cart updated successfully",
                data: cart
            })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
