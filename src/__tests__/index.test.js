import gcn from '../'

describe("getClassNameTests", () => {
    it("should return the expected classes", () => {
        const expected = "base base--active base--expected";
        const result = gcn({
            base: "base",
            "&--active": true,
            "&--expected": () => true,
            "&--unexpected": () => false
        })
        expect(result.toString()).toEqual(expected);
    })

    it("should allow extension", () => {
        const expected = "base--extended";
        const result = gcn({ base: "base" }).extend("&--extended");
        expect(result.toString()).toEqual(expected);
    })

    it("should allow recomputing after extension", () => {
        const expected = "base--extended base--extended--recomputed";
        const result = gcn({ base: "base" }).extend("&--extended").recompute({
            "&--recomputed": true
        });
        expect(result.toString()).toEqual(expected);
    })

    it("should allow changing the interpolation token", () => {
        const expected = "base base--active base--expected";
        const result = gcn({
            base: "base",
            token: "%",
            "%--active": true,
            "%--expected": () => true,
            "%--unexpected": () => false
        })
        expect(result.toString()).toEqual(expected);
    })
})