using RetrosApi.Services;

namespace RetrosApi.Controllers
{
    public class RetrospectiveComment
    {
        public string RetrospectiveName { get; set; }
        public string Comment { get; set; }
        public CommentType CommentType { get; set; }
        public string AddedBy { get; set; }
    }
}