namespace vgl.retros {
    export class RetroInfoDto {
        constructor(public id: string, public name: string){}
    }

    export class RetrospectiveDataDto {
        constructor(
            public whatWentWell: CommentDto[],
            public whatDidNotGoWell: CommentDto[],
            public suggestedImprovements: CommentDto[]
        ){}
    }

    export class CommentDto {
        constructor(public comment: string, public participant: string){}
    }

    export class RetrospectiveDto {
        constructor(public id: string, 
            public name: string, 
            public retrospectiveData: RetrospectiveDataDto){}
    }

    export class RetrospectiveComment {
        constructor(public retrospectiveName: string,
            public comment: string,
            public commentType: number,
            public addedBy: string){}
    }

    export class RetrospectiveService {
        servicebase = "http://localhost:54187";

        getRetros(): JQueryPromise<RetroInfoDto[]>{
            return $.getJSON(`${this.servicebase}/retros`);
        }

        getRetro(retroId: string, retroName: string): JQueryPromise<RetrospectiveDto> {
            let encodedName = encodeURIComponent(retroName);
            return $.getJSON(`${this.servicebase}/retro/${retroId}?retrospectiveName=${retroName}`);
        }

        addRetro(retroName: string) :JQueryPromise<string> {
            return $.ajax({
                type: "POST",
                url: `${this.servicebase}/retros`,
                data: JSON.stringify(retroName),
                dataType: "json",
                contentType: "application/json"
            });
        }

        deleteRetro(retroId: string, retroName: string): JQueryPromise<void> {
            return $.ajax({
                type: "DELETE",
                url: `${this.servicebase}/retros/${retroId}`,
                data: JSON.stringify(retroName),
                contentType: "application/json"
            });
        }

        addComment(retroId: string, comment: RetrospectiveComment){
            return $.ajax({
                type: "POST",
                url: `${this.servicebase}/retro/${retroId}`,
                data: JSON.stringify(comment),
                contentType: "application/json"
            });
        }

        removeComment(retroId: string, comment: RetrospectiveComment){
            return $.ajax({
                type: "DELETE",
                url: `${this.servicebase}/retro/${retroId}`,
                data: JSON.stringify(comment),
                contentType: "application/json"
            });
        }
    }
}