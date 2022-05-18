<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ThuadatResource\Pages;
use App\Filament\Resources\ThuadatResource\RelationManagers;
use App\Models\Thuadat;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use FilamentPro\Resources\Resource;

class ThuadatResource extends Resource
{
    protected static ?string $model = Thuadat::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function getLabel(): string
    {
        return __('app.thuadat');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('thuaid'),
                TextInput::make('xaid'),
                TextInput::make('shbando'),
                TextInput::make('shthua'),
                TextInput::make('dientich'),
                TextInput::make('dientichpl'),
                TextInput::make('maloaidat'),
                TextInput::make('khloaidat'),
                TextInput::make('diadanh'),
                TextInput::make('dtsd'),
                TextInput::make('tenchu'),
                TextInput::make('diachi'),
                TextInput::make('mdsd2003'),
                TextInput::make('kh2003'),
                TextInput::make('shthuatam'),
                TextInput::make('dtthocu'),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('shbando'),
                TextColumn::make('shthua'),
                TextColumn::make('khloaidat'),
                TextColumn::make('tenchu'),
                TextColumn::make('diachi'),
                TextColumn::make('kh2003'),
            ])
            ->filters([
                //
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListThuadats::route('/'),
            'create' => Pages\CreateThuadat::route('/create'),
            'edit' => Pages\EditThuadat::route('/{record}/edit'),
        ];
    }
}
