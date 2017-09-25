namespace vgl.retros{
    describe("RetrospectiveService tests", () => {
        beforeEach(() => {
            jasmine.Ajax.install();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("getRetros calls expected service url", (done) => {
            let expectedDtos = [
                <RetroInfoDto>{id: "id1", name: "item1"},
                <RetroInfoDto>{id: "id2", name: "item2"},
            ];
            jasmine.Ajax.stubRequest("http://localhost:54187/retros")
                .andReturn({
                    status: 200,
                    contentType: "application/json",
                    responseText: JSON.stringify(expectedDtos)
                })
            let sut = new RetrospectiveService();
            sut.getRetros()
                .then(data => {
                    expect(data).toEqual(expectedDtos);
                })
                .fail(ajaxResults.expectSuccess)
                .always(done);
        });
    });
}