import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import { describe } from "node:test";
import AppRoutes from './AppRoutes';

jest.mock("../features/articles/ArticlesList", () =>{
    const MockArticlesList= () => (
        <div>Your Matcher for ArticlesList component here</div>
    );

    return MockArticlesList;
});

jest.mock("../features/articles/ArticleDetails", () =>{
    const MockArticleDetails= () => (
        <div>Your Matcher for ArticleDetails component here</div>
    );

    return MockArticleDetails;
});

jest.mock("../features/articles/NewArticleForm", () =>{
    const MockArticleDetails= () => (
        <div>Your Matcher for NewArticleForm component here</div>
    );

    return MockArticleDetails;
});

jest.mock("../features/articles/EditArticleForm", () =>{
    const MockArticleDetails= () => (
        <div>Your Matcher for EditArticleForm component here</div>
    );

    return MockArticleDetails;
});

jest.mock("../constants", () => ({
    API_URL: "http://your-test-url"
}));

describe("AppRoutes component", () => {

    const renderWithRouter = (ui:any, {initialEntries = ["/"]} = {}) => {
        return render(ui, {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
            )
        });
    };

    test("root path renders ArticlesList", () => {
        render(<AppRoutes/>, { wrapper: MemoryRouter });
        const expectedText = "Your Matcher for ArticlesList component here";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
    
    test("article details path renders ArticleDetails", () => {
        renderWithRouter(<AppRoutes/>, {initialEntries: ["/article/1"]});
        const expectedText = "Your Matcher for ArticleDetails component here";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
    
    test("/new path renders NewArticleForm", () => {
        renderWithRouter(<AppRoutes/>, {initialEntries: ["/new"]});
        const expectedText = "Your Matcher for NewArticleForm component here";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
    
    test("/article/:id/edit path renders EditArticleForm", () => {
        renderWithRouter(<AppRoutes/>, {initialEntries: ["/article/1/edit"]});
        const expectedText = "Your Matcher for EditArticleForm component here";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
});