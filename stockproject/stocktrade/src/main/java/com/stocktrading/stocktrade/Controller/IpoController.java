package com.stocktrading.stocktrade.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.stocktrading.stocktrade.Model.Ipo;
import com.stocktrading.stocktrade.Service.IpoService;


@CrossOrigin("*")
@RestController
@RequestMapping("/ipolist")
public class IpoController {
    @Autowired
    private IpoService ipoService;
    @GetMapping()
    public ResponseEntity<List<Ipo>> getIpoList(@RequestParam("from") String from,@RequestParam("to") String to) {
        List<Ipo> ipolist=ipoService.getallIpoList(from, to);
        return new ResponseEntity<>(ipolist,HttpStatus.ACCEPTED);
    } 
}
