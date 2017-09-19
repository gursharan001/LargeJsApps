using System;
using System.Web.Http;
using System.Web.Http.Cors;
using RetrosApi.Services;

namespace RetrosApi.Controllers
{
    [EnableCors("*", "*", "*", SupportsCredentials = true, PreflightMaxAge = 86400)]
    public class RetrosController : ApiController
    {
        [Route("retros")]
        [HttpGet]
        public IHttpActionResult Retros()
        {
            return RetroStorageService.GetAllRetrospectives().ToJson(this);
        }

        [Route("retros")]
        [HttpPost]
        public IHttpActionResult CreateRetrospective([FromBody]string retrospectiveName)
        {
            var id = Guid.NewGuid();
            RetroStorageService.CreateRetrospective(id, retrospectiveName);
            return Ok(id);
        }

        [Route("retro/{id}")]
        [HttpGet]
        public IHttpActionResult GetRetrospective(Guid id, string retrospectiveName)
        {
            return RetroStorageService.GetRetrospective(id, retrospectiveName).ToJson(this);
            
        }

        [Route("retro/{id}")]
        [HttpPost]
        public IHttpActionResult AddComment([FromUri]Guid id, [FromBody]RetrospectiveComment retrospectiveComment)
        {
            RetroStorageService.AddComment(id, retrospectiveComment.RetrospectiveName, retrospectiveComment.CommentType, retrospectiveComment.Comment, retrospectiveComment.AddedBy);
            return Ok();
        }

        [Route("retro/{id}")]
        [HttpDelete]
        public IHttpActionResult DeleteComment([FromUri]Guid id, [FromBody]RetrospectiveComment retrospectiveComment)
        {
            RetroStorageService.RemoveComment(id, retrospectiveComment.RetrospectiveName, retrospectiveComment.CommentType, retrospectiveComment.Comment, retrospectiveComment.AddedBy);
            return Ok();
        }

        [Route("retros/{id}")]
        [HttpDelete]
        public IHttpActionResult DeleteRetrospective([FromUri]Guid id, [FromBody]string retrospectiveName)
        {
            RetroStorageService.DeleteRetrospective(id, retrospectiveName);
            return Ok();
        }
    }
}
