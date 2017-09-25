namespace vgl.retros {
    export class ajaxResults {
        static expectFailure(result: any) {
            // expectation match is just to generate a message
            expect(result).not.toBe(result, "<=== This test has some error and we didn't expect done to be called");
        }

        static expectSuccess(result: any) {
            // expectation match is just to generate a message
            expect(result).toBeNull("<=== This test has some error and we didn't expect fail to be called");
        }
    }
}