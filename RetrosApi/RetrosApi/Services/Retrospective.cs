using System;
using Microsoft.WindowsAzure.Storage.Table;

namespace RetrosApi.Services
{
    public class Retrospective : TableEntity
    {
        public Retrospective() { }

        public Retrospective(Guid id, string name)
        {
            PartitionKey = name;
            RowKey = id.ToString();
            Id = id;
            Name = name;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string RetrospectiveData { get; set; }
    }

    public class RetrospectiveDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public RetrospectiveDataDto RetrospectiveData { get; set; }
    }

    public class RetrospectiveDataDto {
        public CommentDto[] WhatWentWell { get; set; }
        public CommentDto[] WhatDidNotGoWell { get; set; }
        public CommentDto[] SuggestedImprovements { get; set; }
    }

    public class CommentDto
    {
        public string Comment { get; set; }
        public string Participant { get; set; }
    }
}