import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { http, HttpResponse, delay } from "msw";
import ProductDetail from '../../src/components/ProductDetail';
import { db } from '../mocks/db';
import { server } from '../mocks/server';


describe('ProductDetails', () => {
    let productId : number;

    beforeAll(()=>{
        [1,2,3].forEach(()=>{
            const product = db.product.create();
            productId= product.id;
        })
    });

    afterAll(()=>{  
        db.product.delete({where: {id: { equals: productId}}})
    })

    it('should render product details', async () => {
        const product = db.product.findFirst({where: {id: {equals: productId}}})

        render(<ProductDetail productId={productId}/>);

        expect(await screen.findByText(new RegExp(product!.name))).toBeInTheDocument();
    })

    it('should render the list of products', async () => {
        const product = db.product.findFirst({where: {id: {equals: productId}}})

        render(<ProductDetail productId={productId}/>);

        expect(await screen.findByText(new RegExp(product!.name))).toBeInTheDocument();
        expect(await screen.findByText(new RegExp(product!.price.toString()))).toBeInTheDocument();
    })

    it('should render message if product not found', async () => {
        server.use(http.get("/products/1", ()=> HttpResponse.json(null)));

        render(<ProductDetail productId={1} />);

        const message = await screen.findByText(/not found/i); 
        expect(message).toBeInTheDocument();
    })

    it('should render an error for invalid productId', async () => {
        render(<ProductDetail productId={0} />);

        const message = await screen.findByText(/invalid/i); 
        expect(message).toBeInTheDocument();
    })

    it('should render an error for invalid http request', async () => {
        server.use(http.get("/products/1", ()=> HttpResponse.error()));

        render(<ProductDetail productId={0} />);

        expect(await screen.findByText(/error/i)).toBeInTheDocument();
    })

    it('should render a loading indicator when fetching data', async () => {
        server.use(http.get("/products", async ()=>{
            await delay();
            return HttpResponse.json([])
        }));

        render(<ProductDetail productId={1} />);

        expect(await screen.findByText(/loading/i)).toBeInTheDocument();
    })

    it('should remove the loading indicator after if data fetching is failed', async () => {
        server.use(http.get("/products", ()=> HttpResponse.error()));

        render(<ProductDetail productId={1} />);

        await waitForElementToBeRemoved(()=> screen.queryByText(/loading/i))
    })

    it('should remove the loading indicator after data is fetched', async () => {
        render(<ProductDetail productId={1} />);

        await waitForElementToBeRemoved(()=> screen.queryByText(/loading/i))
    })
})              