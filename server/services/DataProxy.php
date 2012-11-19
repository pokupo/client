<?php

require_once('settings.php');
require_once('IProxy.php');

class DataProxy implements IProxy {

    private $shopId;
    private $query;
    private $parentId;
    private $responseData;
    private $host;
    private $path;

    public function DataProxy($host, $path, $params) {
        $this->host = $host;
        $this->path = $path;
        $this->parseRequestParams($params);
    }
    
    private function parseRequestParams($params){
        $this->shopId = $params['shopId'];
        $this->query = $params['query'];
        $this->parentId = $params['parentId'];
    }

    private function Route() {
        switch ($this->query) {
            case 'getSectionData':
                $this->GetSection();
                break;
            case 'getCatalogData':
                $this->GetCategoriesForRoot();
                break;
            default :
                throw new Exception("Wrong url");
        }
    }
    
    public function Query(){
        $this->Route();
        print $this->responseData;
    }

    private function GetData($url) {
        return file_get_contents($url);
    }

    private function GetSection() {
        $sections = $this->GetData(Settings::HostApi . Settings::CatalogPathApi . $this->shopId . '/root/noblock/active');
        $this->responseData = $sections;
    }

    private function GetCategoriesForRoot() {
        $category = $this->GetData(Settings::HostApi . Settings::CatalogPathApi . $this->parentId . '/children/noblock/active');
        $category = '{"parentId" : "'.$this->parentId.'", "items": '.$category.'}';
        $this->responseData = $category;
    }
}
$proxy = new DataProxy(Settings::HostApi , Settings::CatalogPathApi, $_GET);
$proxy->Query();
