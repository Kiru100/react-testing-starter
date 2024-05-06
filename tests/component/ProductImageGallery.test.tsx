
import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("Product Image Gallery Component", () => {
    it("Should not render anything when there's not image url.", () => {
        const image_urls: string[] = [];

        const { container } = render(<ProductImageGallery imageUrls={image_urls} />);
        expect(container).toBeEmptyDOMElement();
    })

    it("Should render images with the right src attribute.", () => {
        const image_urls: string[] = [
            "https://i.pravatar.cc/150?img=3",
            "https://i.pravatar.cc/150?img=4",
            "https://i.pravatar.cc/150?img=5",
        ];

        render(<ProductImageGallery imageUrls={image_urls} />);
    
        const images = screen.getAllByRole("img");
        
        expect(images).toHaveLength(3);

        image_urls.forEach((url, index) =>{
            expect(images[index]).toHaveAttribute("src", url);
        })
    })
})