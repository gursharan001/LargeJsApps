namespace vgl.retros {
    export enum CommentType {
        WentWell,
        DidNotGotWell,
        SuggestedImprovement
    }

    export class RetroVm {
        whatWentWell = ko.observableArray<CommentDto>([]);
        whatDidNotGoWell = ko.observableArray<CommentDto>([]);
        suggestedImprovements = ko.observableArray<CommentDto>([]);
        wentWell = ko.observable<string>(null);
        didNotGoWell = ko.observable<string>(null);
        suggestedImprovement = ko.observable<string>(null);

        constructor(
            public retroId: string, 
            public retroName: string,
            public retroSvc: RetrospectiveService = new RetrospectiveService()){
            this.retroSvc
                .getRetro(retroId, retroName)
                .then(retrospectiveDto => {
                    this.whatWentWell(retrospectiveDto.retrospectiveData.whatWentWell);
                    this.whatDidNotGoWell(retrospectiveDto.retrospectiveData.whatDidNotGoWell);
                    this.suggestedImprovements(retrospectiveDto.retrospectiveData.suggestedImprovements);
                });
        }

        addWentWellComment = () => {
            let comment = this.wentWell();
            let addedBy = "barry";
            this.addComment(comment, CommentType.WentWell, addedBy)
                .then(() => {
                    this.whatWentWell.push(new CommentDto(comment, addedBy));
                    this.wentWell(null);
                });
        }

        addDidNotGoWellComment = () => {
            let comment = this.didNotGoWell();
            let addedBy = "barry";
            this.addComment(comment, CommentType.DidNotGotWell, addedBy)
            .then(() => {
                this.whatDidNotGoWell.push(new CommentDto(comment, addedBy));
                this.didNotGoWell(null);
            });
        }

        addSuggestedImprovementComment = () => {
            let comment = this.suggestedImprovement();
            let addedBy = "barry";
            this.addComment(this.suggestedImprovement(), CommentType.SuggestedImprovement, addedBy)
            .then(() => {
                this.suggestedImprovements.push(new CommentDto(comment, addedBy));
                this.suggestedImprovement(null);
            });
        }

        removeWentWellComment = (comment: CommentDto) => {
            this.deleteComment(comment, CommentType.WentWell)
                .then(() => {
                    this.whatWentWell.remove(comment);
                });
        }

        removeDidNotGoWellComment = (comment: CommentDto) => {
            this.deleteComment(comment, CommentType.DidNotGotWell)
            .then(() => {
                this.whatDidNotGoWell.remove(comment);
            });
        }

        removeSuggestedImprovementComment = (comment: CommentDto) => {
            this.deleteComment(comment, CommentType.SuggestedImprovement)
            .then(() => {
                this.suggestedImprovements.remove(comment);
            });
        }

        addComment = (comment: string, commentType: number, addedBy: string) => {
            let commentToAdd = new RetrospectiveComment(this.retroName, comment, commentType, addedBy);
            return this.retroSvc.addComment(this.retroId, commentToAdd);
        }

        deleteComment = (comment: CommentDto, commentType: number) => {
            let commentToDelete = new RetrospectiveComment(this.retroName, comment.comment, commentType, comment.participant);
            return this.retroSvc.removeComment(this.retroId, commentToDelete);
        }
            
    }
}