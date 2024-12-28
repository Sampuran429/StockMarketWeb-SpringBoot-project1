package com.stocktrading.stocktrade.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class IpoCalendarResponse {
    @JsonProperty("ipoCalendar")
    private List<Ipo> ipoCalendar;

    // Getters and setters
    public List<Ipo> getIpoCalendar() {
        return ipoCalendar;
    }

    public void setIpoCalendar(List<Ipo> ipoCalendar) {
        this.ipoCalendar = ipoCalendar;
    }
}
