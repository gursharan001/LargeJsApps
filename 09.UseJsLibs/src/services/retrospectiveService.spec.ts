namespace vgl.retros {
    describe("RetrospectiveService tests", () => {
        it("creates", () => {
            let pal = <IPal>{};
            let sut = new RetrospectiveService(pal);
            expect(sut).not.toBe(null);
        });

        it("getRetros expected service" , () => {
            let fetchSpy = jasmine.createSpy("fetch");
            let pal = <IPal>{
                fetch: fetchSpy
            };
            
            let sut = new RetrospectiveService(pal);
        });
    });
}