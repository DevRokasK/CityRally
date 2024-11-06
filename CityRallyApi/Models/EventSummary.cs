using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

public class EventSummary
{
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    public string? Title { get; set; }

    [Column("description")]
    public string? Description { get; set; }

    [Column("startDate")]
    public DateTime StartDate { get; set; }

    [Column("endDate")]
    public DateTime EndDate { get; set; }

    [Column("primaryColor")]
    public string? PrimaryColor { get; set; }

    [Column("secondaryColor")]
    public string? SecondaryColor { get; set; }

    [Column("state")]
    public EventStatus State { get; set; }

    public int TeamCount { get; set; }
}
