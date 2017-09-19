using System.Collections.Generic;

namespace RetrosApi.Services
{
    public class RetrospectiveData
    {
        public RetrospectiveData()
        {
            WhatWentWell = new List<(string particpant, string comment)>();
            WhatDidNotGoWell = new List<(string participant, string comment)>();
            SuggestedImprovements = new List<(string particpant, string comment)>();
        }

        public List<(string particpant, string comment)> WhatWentWell { get; set; }
        public List<(string participant, string comment)> WhatDidNotGoWell { get; set; }
        public List<(string particpant, string comment)> SuggestedImprovements { get; set; }
    }
}