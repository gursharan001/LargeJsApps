namespace vgl.retros {
    describe("retrosVm tests", () => {

        it("vm loads expected data", () => {
            let expectedDtos = <RetroInfoDto[]>[
                <RetroInfoDto>{id: "id1", name: "name1"},
                <RetroInfoDto>{id: "id2", name: "name2"}
            ];
            let deferred = $.Deferred<RetroInfoDto[]>();
            let getRetrosStub = jasmine.createSpy("getRetros")
                .and.returnValue(deferred.resolve(expectedDtos))
            let svc = new RetrospectiveService();
            svc.getRetros = getRetrosStub;
    
            let sut = new RetrosVm(svc);
    
            expect(sut.retros()).toEqual(expectedDtos);    
        });
    });
}