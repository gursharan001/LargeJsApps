using System.Text;
using System.Web.Http;
using System.Web.Http.Results;
using RetrosApi.Services;

namespace RetrosApi.Controllers
{
    public static class ApiControllerExtensions
    {
        public static JsonResult<T> ToJson<T>(this T obj, ApiController controller)
        {
            return new JsonResult<T>(obj,
                RetrosApiSerialization.JsonSerializerSettings,
                new UTF8Encoding(false, true),
                controller);
        }
    }
}