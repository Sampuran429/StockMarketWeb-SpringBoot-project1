package com.stocktrading.stocktrade.Service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.stocktrading.stocktrade.Model.Ipo;
@Service
public interface IpoService {
    List<Ipo> getallIpoList(String from,String  to);
}
