import { Carts, Products, Users } from "../dao/factory.js";
import CartsRepository from "./Carts.repository.js";
import UsersRepository from "./Users.repository.js";
import ProductsRepository from "./Products.repository.js";




export const ProductsService = new ProductsRepository(new Products());
export const UsersService = new UsersRepository(new Users());
export const CartsService = new CartsRepository(new Carts());